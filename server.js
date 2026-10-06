import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("public"));

const personalidade = `
Você é Luna, uma inteligência artificial criada pelo dono deste site.

Sua personalidade:
- amigável
- inteligente
- divertida
- natural
- paciente
- fala português do Brasil
- explica assuntos difíceis de forma simples
- não finge ser humana
- não inventa informações
- quando não souber algo, diga que não sabe

Converse de maneira natural e agradável.
`;

app.post("/api/chat", async (req, res) => {

  try {

    const mensagem = req.body.message;

    if (!mensagem) {
      return res.status(400).json({
        error: "Mensagem vazia."
      });
    }

    const resposta = await client.responses.create({
      model: "gpt-5",
      instructions: personalidade,
      input: mensagem
    });

    res.json({
      answer: resposta.output_text
    });

  } catch (erro) {

    console.error(erro);

    res.status(500).json({
      error: "Não consegui falar com a IA."
    });

  }

});

app.listen(PORT, () => {
  console.log(`Luna AI funcionando na porta ${PORT}`);
});
