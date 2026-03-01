import { useAuthStore } from "@/stores/useAuthStore";
import { Header } from "./components/Header";
import { Dashboardstats } from "./components/Dashboardstats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import { AlbumsTabContent } from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

function AdminPage() {
    const {isAdmin, isLoading} = useAuthStore();
    const {fetchAlbums, fetchSongs, fetchStats} = useMusicStore();
    useEffect(() => {
        fetchSongs();
        fetchAlbums();
        fetchStats();
    },[fetchAlbums,fetchSongs,fetchStats]);
    if(!isAdmin && !isLoading) return <div>Unauthorized Admin</div>
    return (
        <div className="min-h-screen bg-linear-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
            <Header/>
            <Dashboardstats/>
            <Tabs defaultValue="songs" className="space-y-8">
                <TabsList className="p-1 bg-zinc-800/50">
                    <TabsTrigger value="songs" className="data-state-active:bg-zinc-700">
                        <Music className="mr-2 size-4"/>
                        Songs
                    </TabsTrigger>
                    <TabsTrigger value="albums" className="data-state-active:bg-zinc-700">
                        <Album className="mr-2 size-4"/>
                        Albums
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="songs">
                    <SongsTabContent/>
                </TabsContent>
                <TabsContent value="albums">
                    <AlbumsTabContent/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AdminPage