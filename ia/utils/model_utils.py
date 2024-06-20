import torch

def train_model(model, train_loader, optimizer):
    model.train()
    train_loss = 0
    for batch in train_loader:
        input_ids, target_ids = batch
        outputs = model(input_ids=input_ids, labels=target_ids)
        loss = outputs.loss
        train_loss += loss.item()
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
    avg_train_loss = train_loss / len(train_loader)
    return avg_train_loss

def validate_model(model, val_loader):
    model.eval()
    val_loss = 0
    with torch.no_grad():
        for batch in val_loader:
            input_ids, target_ids = batch
            outputs = model(input_ids=input_ids, labels=target_ids)
            val_loss += outputs.loss.item()
    avg_val_loss = val_loss / len(val_loader)
    return avg_val_loss

def save_model(model, tokenizer, save_directory):
    model.save_pretrained(save_directory)
    tokenizer.save_pretrained(save_directory)
