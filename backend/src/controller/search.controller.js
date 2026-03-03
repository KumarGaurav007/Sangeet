import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";

export const search = async (req, res, next) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.status(400).json({ message: "Search query required" });
        }

        const songsPromise = Song.find(
            { $text: { $search: q } },
            { score: { $meta: "textScore" } }
        )
            .sort({ score: { $meta: "textScore" } })
            .limit(5);

        const albumsPromise = Album.find(
            { $text: { $search: q } },
            { score: { $meta: "textScore" } }
        )
            .sort({ score: { $meta: "textScore" } })
            .limit(5);

        const [songs, albums] = await Promise.all([
            songsPromise,
            albumsPromise,
        ]);

        res.status(200).json({ songs, albums });
    } catch (error) {
        next(error);
    }
};