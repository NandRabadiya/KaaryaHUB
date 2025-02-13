import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon, CalendarIcon, Users2Icon, TagIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import IssueList from '../Issue/IssueList';
import ChatBox from './ChatBox';
import InviteUserForm from './InviteUserForm';

const ProjectDetail = () => {
  const handleProjectInvitation = () => {
         // dispatch(inviteToProject({ email: "", projectId: id }));
     };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <ScrollArea className="h-[calc(100vh-2rem)]">
            {/* Project Header */}
            <Card className="mb-6">
              <CardHeader className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <h1 className="text-3xl font-display font-bold">Project Name</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users2Icon className="h-4 w-4" />
                      <span>Team Project</span>
                      <span>•</span>
                      <Badge variant="outline" className="rounded-full">
                        In Progress
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Project Description */}
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                    Inventore at, expedita hic natus saepe autem! Dolor eius, 
                    assumenda asperiores accusamus alias, rem atque omnis obcaecati 
                    nisi quasi sapiente eum molestias?
                  </p>
                </div>

                {/* Project Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                  {/* Project Lead */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Project Lead</h3>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">Lead Developer</p>
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 1, 1, 1].map((_, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Avatar className="border-2 border-background">
                                  <AvatarFallback>
                                    {String.fromCharCode(65 + index)}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>Team Member {index + 1}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full ml-2"
                            onClick={handleProjectInvitation}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Invite Team Member</DialogTitle>
                          </DialogHeader>
                          <InviteUserForm />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                    <Badge variant="secondary">Full Stack</Badge>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Badge className="bg-orange-300 hover:bg-orange-400 dark:bg-orange-700 dark:hover:bg-orange-600">
                      In Progress
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tasks Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-semibold">Tasks</h2>
                <Button variant="outline" size="sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                    <span className="h-2 w-2 bg-yellow-400 rounded-full"></span>
                    Todo
                  </h3>
                  <IssueList status="pending" title="Todo List" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-400 rounded-full"></span>
                    In Progress
                  </h3>
                  <IssueList status="in_progress" title="In Progress" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-muted-foreground flex items-center gap-2">
                    <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                    Done
                  </h3>
                  <IssueList status="done" title="Done" />
                </div>
              </div>
            </section>
          </ScrollArea>
        </div>

        {/* Chat Section */}
        <div className="lg:w-[380px] sticky top-8">
          <Card className="h-[calc(100vh-4rem)]">
            <CardHeader>
              <h2 className="text-xl font-display font-semibold">Team Chat</h2>
            </CardHeader>
            <CardContent className="p-0">
              <ChatBox />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;