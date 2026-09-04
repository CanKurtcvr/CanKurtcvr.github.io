import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 1. Import your existing games (Fjernet krøllede parenteser her)
import BlackjackGame from "./games/BlackjackGame";
import PongGame from "./games/PongGame";
import SnakeGame from "./games/SnakeGame";
import WebShooterGame from "./games/WebShooterGame";

// 2. Import the new Vanekort game (Beholdt krøllede parenteser her)
import { VanekortGame } from "./games/VanekortGame";

export default function GamesSection() {
  return (
    <section id="games" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Games</h2>
        
        {/* Make sure defaultValue is set to one of your games */}
        <Tabs defaultValue="vanekort" className="w-full max-w-4xl mx-auto">
          
          {/* 3. Add the Vanekort trigger to your TabsList */}
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="vanekort">Vanekort</TabsTrigger>
            <TabsTrigger value="blackjack">Blackjack</TabsTrigger>
            <TabsTrigger value="pong">Pong</TabsTrigger>
            <TabsTrigger value="snake">Snake</TabsTrigger>
            <TabsTrigger value="web-shooter">Web Shooter</TabsTrigger>
          </TabsList>

          {/* 4. Add the TabsContent block for Vanekort */}
          <TabsContent value="vanekort" className="mt-4">
            <VanekortGame />
          </TabsContent>

          {/* Your existing game content blocks */}
          <TabsContent value="blackjack" className="mt-4">
            <BlackjackGame />
          </TabsContent>
          
          <TabsContent value="pong" className="mt-4">
            <PongGame />
          </TabsContent>
          
          <TabsContent value="snake" className="mt-4">
            <SnakeGame />
          </TabsContent>

          <TabsContent value="web-shooter" className="mt-4">
            <WebShooterGame />
          </TabsContent>
          
        </Tabs>
      </div>
    </section>
  );
}
