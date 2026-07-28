import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { compilerLanguages } from "../constants";
import {
  FiPlay,
  FiTrash2,
  FiCopy,
  FiCheck,
  FiTerminal,
  FiLoader,
  FiRotateCcw,
  FiMaximize2,
  FiMinimize2,
  FiX,
} from "react-icons/fi";

const langExtensions = {
  javascript: () => [javascript()],
  typescript: () => [javascript({ typescript: true })],
  java: () => [java()],
  cpp: () => [cpp()],
  python: () => [python()],
};

// Multiple free code execution API endpoints
const PISTON_ENDPOINTS = [
  "https://emkc.org/api/v2/piston/execute",
  "https://piston-api.fly.dev/api/v2/execute",
];

// Judge0 CE (free, hosted on RapidAPI / sulu.sh)
const JUDGE0_ENDPOINT = "https://judge0-ce.p.sulu.sh/submissions";

// Judge0 language IDs
const JUDGE0_LANG_MAP = {
  javascript: 63,  // Node.js
  python: 71,      // Python 3
  java: 62,        // Java
  cpp: 54,         // C++ (GCC 9.2.0)
  typescript: 74,  // TypeScript
};

// Execute via Judge0 CE API
async function executeViaJudge0(language, code, signal) {
  const langId = JUDGE0_LANG_MAP[language];
  if (!langId) return null;

  // Submit
  const submitRes = await fetch(`${JUDGE0_ENDPOINT}?base64_encoded=true&wait=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      language_id: langId,
      source_code: btoa(unescape(encodeURIComponent(code))),
      stdin: "",
    }),
  });

  if (!submitRes.ok) return null;

  const result = await submitRes.json();
  const stdout = result.stdout ? decodeURIComponent(escape(atob(result.stdout))) : "";
  const stderr = result.stderr ? decodeURIComponent(escape(atob(result.stderr))) : "";
  const compileOutput = result.compile_output ? decodeURIComponent(escape(atob(result.compile_output))) : "";

  if (result.status?.id >= 6) {
    // Error status (compilation error, runtime error, etc.)
    return { output: null, error: `⚠️ ${result.status.description}:\n${stderr || compileOutput || "Unknown error"}` };
  }

  if (stderr) {
    return { output: null, error: `⚠️ Error:\n${stderr}` };
  }

  return { output: stdout || "✅ Program executed successfully (no output).", error: null };
}

// Execute via Piston API
async function executeViaPiston(language, version, code, signal) {
  for (const endpoint of PISTON_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal,
        body: JSON.stringify({
          language,
          version,
          files: [{ content: code }],
        }),
      });

      if (!res.ok) continue;

      const data = await res.json();
      const runResult = data.run || {};
      if (runResult.stderr) {
        return { output: null, error: `⚠️ Error:\n${runResult.stderr}` };
      }
      return { output: runResult.output || "✅ Program executed successfully (no output).", error: null };
    } catch (err) {
      if (err.name === "AbortError") throw err;
      continue;
    }
  }
  return null;
}

// Client-side JS/TS execution fallback when all APIs fail
function executeJsLocally(code) {
  const logs = [];
  const fakeConsole = {
    log: (...args) => logs.push(args.map(String).join(" ")),
    warn: (...args) => logs.push("⚠️ " + args.map(String).join(" ")),
    error: (...args) => logs.push("❌ " + args.map(String).join(" ")),
    info: (...args) => logs.push(args.map(String).join(" ")),
    table: (data) => logs.push(JSON.stringify(data, null, 2)),
  };
  const fakeProcess = { stdout: { write: (s) => logs.push(String(s)) } };

  try {
    const fn = new Function("console", "process", code);
    fn(fakeConsole, fakeProcess);
    return { output: logs.join("\n") || "✅ Program executed successfully (no output).", error: null };
  } catch (err) {
    return { output: null, error: `⚠️ Error:\n${err.message}` };
  }
}

export default function Compiler() {
  const [activeLang, setActiveLang] = useState(compilerLanguages[0]);
  const [code, setCode] = useState(compilerLanguages[0].defaultCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [execTime, setExecTime] = useState(null);
  const abortRef = useRef(null);

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  // Escape key exits fullscreen
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && expanded) setExpanded(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [expanded]);

  const switchLanguage = useCallback((lang) => {
    setActiveLang(lang);
    setCode(lang.defaultCode);
    setOutput("");
    setExecTime(null);
  }, []);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    setExecTime(null);

    const start = performance.now();
    const controller = new AbortController();
    abortRef.current = controller;

    let result = null;

    try {
      // Strategy 1: Try Piston API endpoints
      result = await executeViaPiston(
        activeLang.pistonLang,
        activeLang.pistonVersion,
        code,
        controller.signal
      );

      // Strategy 2: Try Judge0 CE if Piston failed
      if (!result) {
        result = await executeViaJudge0(activeLang.id, code, controller.signal);
      }

      // Strategy 3: Client-side execution for JS/TS
      if (!result && (activeLang.id === "javascript" || activeLang.id === "typescript")) {
        result = executeJsLocally(code);
        if (result) {
          const val = result.error || result.output;
          result = {
            output: result.error ? null : val + "\n\n💡 Ran locally in browser",
            error: result.error ? result.error + "\n\n💡 Ran locally in browser" : null,
          };
        }
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setOutput("⛔ Execution cancelled.");
        setIsRunning(false);
        abortRef.current = null;
        return;
      }
    }

    const elapsed = ((performance.now() - start) / 1000).toFixed(2);
    setExecTime(elapsed);

    if (result) {
      setOutput(result.error || result.output);
    } else {
      setOutput(
        `❌ Could not connect to any code execution service.\n\nPlease check your internet connection and try again.\n\n💡 Tip: JavaScript & TypeScript can still run locally — try switching to those languages.`
      );
    }

    setIsRunning(false);
    abortRef.current = null;
  }, [activeLang, code]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(activeLang.defaultCode);
    setOutput("");
    setExecTime(null);
  }, [activeLang]);

  const extensions = langExtensions[activeLang.id]?.() || [javascript()];

  return (
    <section id="compiler" className="relative z-10 py-20">
      <span className="hash-span" id="compiler">
        &nbsp;
      </span>
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            Write &amp; Execute
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            Code <span className="gradient-text">Playground</span>
          </h2>
          <p className="text-secondary text-sm mt-4 max-w-2xl leading-relaxed">
            An interactive multi-language compiler right in the browser. Write
            code, hit run, and see results instantly — no setup needed.
          </p>
        </motion.div>

        {/* Compiler container */}
        {/* Fullscreen backdrop */}
        {expanded && (
          <div
            className="fixed inset-0 z-[998] bg-[#050816]"
            onClick={() => setExpanded(false)}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-12 rounded-2xl neon-border overflow-hidden transition-all duration-500 ${
            expanded
              ? "fixed inset-3 sm:inset-6 z-[999] mt-0 bg-[#050816] border border-[#915EFF]/30"
              : "glass"
          }`}
        >
          {/* Fullscreen close button — always visible at top-right */}
          {expanded && (
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-3 right-3 z-[1000] w-9 h-9 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-500/40 hover:text-white transition-all"
              title="Exit fullscreen (Esc)"
            >
              <FiX size={18} />
            </button>
          )}

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-white/5">
            {/* Language tabs */}
            <div className="flex flex-wrap gap-1.5">
              {compilerLanguages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => switchLanguage(lang)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activeLang.id === lang.id
                      ? "text-white shadow-lg"
                      : "text-secondary hover:text-white hover:bg-white/5"
                  }`}
                  style={
                    activeLang.id === lang.id
                      ? {
                          background: `linear-gradient(135deg, ${lang.color}30, ${lang.color}10)`,
                          border: `1px solid ${lang.color}50`,
                          boxShadow: `0 0 20px ${lang.color}15`,
                        }
                      : { border: "1px solid transparent" }
                  }
                >
                  <span>{lang.icon}</span>
                  <span className="hidden xs:inline">{lang.label}</span>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={resetCode}
                className="p-2 rounded-lg text-secondary hover:text-white hover:bg-white/5 transition-colors"
                title="Reset code"
              >
                <FiRotateCcw size={14} />
              </button>
              <button
                onClick={copyCode}
                className="p-2 rounded-lg text-secondary hover:text-white hover:bg-white/5 transition-colors"
                title="Copy code"
              >
                {copied ? (
                  <FiCheck size={14} className="text-[#00cea8]" />
                ) : (
                  <FiCopy size={14} />
                )}
              </button>
              <button
                onClick={() => setExpanded(!expanded)}
                className={`p-2 rounded-lg text-secondary hover:text-white hover:bg-white/5 transition-colors ${
                  expanded ? "block" : "hidden sm:block"
                }`}
                title={expanded ? "Exit fullscreen (Esc)" : "Fullscreen"}
              >
                {expanded ? (
                  <FiMinimize2 size={14} />
                ) : (
                  <FiMaximize2 size={14} />
                )}
              </button>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all duration-300 disabled:opacity-50"
                style={{
                  background: isRunning
                    ? "rgba(145,94,255,0.3)"
                    : `linear-gradient(135deg, #915EFF, #00cea8)`,
                  boxShadow: isRunning
                    ? "none"
                    : "0 0 20px rgba(145,94,255,0.3)",
                }}
              >
                {isRunning ? (
                  <>
                    <FiLoader className="animate-spin" size={14} />
                    Running...
                  </>
                ) : (
                  <>
                    <FiPlay size={14} />
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Editor + Output */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 ${
              expanded ? "h-[calc(100%-56px)] overflow-hidden" : ""
            }`}
          >
            {/* Code editor */}
            <div
              className={`border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden flex flex-col`}
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-secondary text-[11px] ml-2">
                  {activeLang.label} Editor
                </span>
              </div>
              <CodeMirror
                value={code}
                onChange={setCode}
                extensions={extensions}
                theme={vscodeDark}
                height={expanded ? "100%" : "400px"}
                className={expanded ? "flex-1 overflow-auto" : ""}
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLine: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: true,
                  foldGutter: true,
                  indentOnInput: true,
                }}
                style={{ fontSize: "13px" }}
              />
            </div>

            {/* Output panel */}
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <FiTerminal size={14} className="text-[#00cea8]" />
                  <span className="text-secondary text-[11px]">Output</span>
                </div>
                <div className="flex items-center gap-3">
                  {execTime && (
                    <span className="text-[11px] text-secondary/60">
                      {execTime}s
                    </span>
                  )}
                  {output && (
                    <button
                      onClick={() => {
                        setOutput("");
                        setExecTime(null);
                      }}
                      className="text-secondary hover:text-white transition-colors"
                      title="Clear output"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`p-4 font-mono text-[13px] leading-relaxed overflow-auto flex-1 ${
                  expanded ? "" : "h-[400px]"
                }`}
              >
                {isRunning ? (
                  <div className="flex items-center gap-3 text-secondary">
                    <div className="w-5 h-5 border-2 border-[#915EFF] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Compiling &amp; executing...</span>
                  </div>
                ) : output ? (
                  <pre
                    className={`whitespace-pre-wrap break-words ${
                      output.startsWith("⚠️") || output.startsWith("❌")
                        ? "text-red-400"
                        : "text-[#00cea8]"
                    }`}
                  >
                    {output}
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-secondary/40">
                    <FiTerminal size={40} className="mb-4" />
                    <p className="text-sm">
                      Click{" "}
                      <span className="text-[#915EFF] font-semibold">
                        Run Code
                      </span>{" "}
                      to see the output here
                    </p>
                    <p className="text-xs mt-1 text-secondary/25">
                      Powered by Piston API — supports 50+ languages
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language feature cards */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {compilerLanguages.map((lang, i) => (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              onClick={() => switchLanguage(lang)}
              className={`glass rounded-xl p-4 text-center transition-all duration-300 group ${
                activeLang.id === lang.id
                  ? "neon-glow"
                  : "neon-border hover:neon-glow"
              }`}
            >
              <div className="text-2xl mb-2">{lang.icon}</div>
              <div
                className="text-sm font-semibold"
                style={{ color: lang.color }}
              >
                {lang.label}
              </div>
              <div className="text-secondary text-[10px] mt-1 opacity-60">
                v{lang.pistonVersion}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
