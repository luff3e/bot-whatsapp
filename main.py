import tkinter as tk
from tkinter import messagebox
import json
import os

# Função para gerar o bot
def gerar_bot():
    nome_empresa = entry_nome_empresa.get()
    numero_wpp = entry_numero_wpp.get()
    boas_vindas = entry_boas_vindas.get()

    # Verificação de preenchimento dos campos
    if not nome_empresa or not numero_wpp or not boas_vindas:
        messagebox.showerror("Erro", "Preencha todos os campos obrigatórios!")
        return

    # Configurações dos serviços (marcados pelo usuário)
    serviços = []
    if var_atendimento_ia.get():
        serviços.append("Atendimento com IA")
    if var_agendamento.get():
        serviços.append("Agendamento")
    if var_cadastro_cliente.get():
        serviços.append("Cadastro de Clientes")

    # Salvar a configuração do bot no arquivo JSON
    config = {
        "empresa": nome_empresa,
        "numeroWhatsApp": numero_wpp,
        "boasVindas": boas_vindas,
        "servicos": serviços
    }

    if not os.path.exists('config.json'):
        with open('config.json', 'w') as f:
            json.dump(config, f, indent=4)
    else:
        with open('config.json', 'r') as f:
            existing_config = json.load(f)

        existing_config.update(config)

        with open('config.json', 'w') as f:
            json.dump(existing_config, f, indent=4)

    messagebox.showinfo("Sucesso", f"Bot para {nome_empresa} gerado com sucesso!")

# Configuração da interface
root = tk.Tk()
root.title("Gerador de Bot - ProjetoY")

# Entrada de Nome da Empresa
label_nome_empresa = tk.Label(root, text="Nome da Empresa:")
label_nome_empresa.pack()
entry_nome_empresa = tk.Entry(root)
entry_nome_empresa.pack()

# Entrada de Número do WhatsApp
label_numero_wpp = tk.Label(root, text="Número do WhatsApp:")
label_numero_wpp.pack()
entry_numero_wpp = tk.Entry(root)
entry_numero_wpp.pack()

# Entrada de Mensagem de Boas-vindas
label_boas_vindas = tk.Label(root, text="Mensagem de Boas-Vindas:")
label_boas_vindas.pack()
entry_boas_vindas = tk.Entry(root)
entry_boas_vindas.pack()

# Configuração dos serviços
var_atendimento_ia = tk.BooleanVar()
var_agendamento = tk.BooleanVar()
var_cadastro_cliente = tk.BooleanVar()

check_atendimento_ia = tk.Checkbutton(root, text="Atendimento com IA", variable=var_atendimento_ia)
check_atendimento_ia.pack()

check_agendamento = tk.Checkbutton(root, text="Agendamento", variable=var_agendamento)
check_agendamento.pack()

check_cadastro_cliente = tk.Checkbutton(root, text="Cadastro de Clientes", variable=var_cadastro_cliente)
check_cadastro_cliente.pack()

# Botão para gerar o bot
botao_gerar_bot = tk.Button(root, text="Gerar Bot", command=gerar_bot)
botao_gerar_bot.pack()

root.mainloop()
