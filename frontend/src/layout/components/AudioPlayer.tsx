import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"

function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext } = usePlayerStore();

    // Handles Play & Pause logic
    useEffect(() => {
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying])

    // handles song end and next song play
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            playNext();
        }
        audio?.addEventListener("ended", handleEnded);
        return () => audio?.removeEventListener("ended", handleEnded);
    }, [playNext])

    // handles song change
    useEffect(() => {
        if(!audioRef.current || !currentSong) return;
        const audio = audioRef.current;
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
        if(isSongChange){
            audio.src = currentSong?.audioUrl;
            audio.currentTime = 0;
            prevSongRef.current = currentSong?.audioUrl;
            if(isPlaying) audio.play();
        }
    }, [currentSong, isPlaying])
    


    return <audio ref={audioRef}/>
}

export default AudioPlayer