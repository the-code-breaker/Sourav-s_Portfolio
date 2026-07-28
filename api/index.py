import sys
import os

# Add backend directory to Python path so serverless function can import backend modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from main import app  # noqa: E402, F401
