import pickle
import os
from typing import Any

class ModelLoader:
    """Utility class for loading and managing the ML model"""
    
    def __init__(self):
        self._model = None
        self._model_path = os.path.join(
            os.path.dirname(__file__), 
            "..", 
            "models", 
            "best_pm25_model.pkl"
        )
    
    def load_model(self) -> Any:
        """
        Load the trained model from disk
        
        Returns:
            Loaded ML model
            
        Raises:
            FileNotFoundError: If model file is not found
            Exception: If there's an error loading the model
        """
        if self._model is None:
            # Check if model file exists
            if not os.path.exists(self._model_path):
                raise FileNotFoundError(
                    f"Model file not found at {self._model_path}. "
                    "Please train the model first and save it to the models directory."
                )
            
            try:
                with open(self._model_path, 'rb') as f:
                    self._model = pickle.load(f)
                print(f"Model successfully loaded from {self._model_path}")
            except Exception as e:
                raise Exception(f"Failed to load model: {str(e)}")
        
        return self._model
    
    def get_model_info(self) -> dict:
        """
        Get information about the loaded model
        
        Returns:
            Dictionary containing model information
        """
        model = self.load_model()
        return {
            "model_type": type(model).__name__,
            "model_path": self._model_path,
            "loaded": self._model is not None
        }
    
    def is_model_loaded(self) -> bool:
        """
        Check if model is loaded
        
        Returns:
            Boolean indicating if model is loaded
        """
        return self._model is not None

# Global instance
model_loader = ModelLoader()