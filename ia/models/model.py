from transformers import T5ForConditionalGeneration, T5Tokenizer

model_path = "ia/models/fine-tuned-t5-base"  # Ruta relativa al directorio de trabajo
model = T5ForConditionalGeneration.from_pretrained(model_path)
tokenizer = T5Tokenizer.from_pretrained(model_path)
