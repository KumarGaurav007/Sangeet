
import React from "react"
import { Outlet } from "react-router-dom"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import LeftSidebar from "./components/LeftSidebar"
import FriendsActivity from "./components/FriendsActivity"
import AudioPlayer from "./components/AudioPlayer"

const MainLayout = () => {
    const isMobile = false

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">

                <AudioPlayer/>
                <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
                    <LeftSidebar />
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                    <Outlet />
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                    <FriendsActivity />
                </ResizablePanel>

            </ResizablePanelGroup>
        </div>
    )
}

export default MainLayout
