const { Player2 } = require("../models/player2");

require("dotenv").config();

class PlayerController {
    static async getPlayers(req, res) {
        try {
          const players = await Player2.find();
          return res.status(200).send({ players });
        } catch (error) {
          return res.status(404).send({ error: 'Game not found!' });
        }
      }

    static async postPlayer(req, res) {
        const { nome, data, tempo, f1, f2, f3, f4, f5, tentativas, qtd_formas } = req.body;

        if (!nome || !data || !tempo || !f1 || !f2 || !f3 || !f4 || !f5 || !tentativas || !qtd_formas)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        const player = new Player2({
            nome,
            data,
            tempo,
            f1,
            f2,
            f3,
            f4,
            f5,
            tentativas,
            qtd_formas,
            release: Date.now(),
            createdAt: Date.now(),
        });

        try {
            await player.save();
            // await Player.create(player);

            res.status(201).send({ message: 'Player registered successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a player' });
        }

    }

    static async clearPlayers(req, res) {
        try {
            await Player2.deleteMany({});
            return res.status(200).send({ message: 'All players deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing players' });
        }
    }
    
}

module.exports = PlayerController;


// {
//     "nome": "nome",
//     "data": "data",
//     "tempo": "tempo",
//     "f1": 1,
//     "f2": 2,
//     "f3": 3,
//     "f4": 4,
//     "f5": 5 ,
//     "tentativas": 2,
//     "qtd_formas": 12
// }