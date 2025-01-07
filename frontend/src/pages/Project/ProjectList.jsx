import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import ProjectCard from "./ProjectCard";

const tags = [
  "all",
  "react",
  "nodejs",
  "express",
  "mongodb",
  "typescript",
  "javascript",
  "css",
  "html",
  "tailwindcss",
  "bootstrap",
];

const ProjectList = () => {
  const [keyword, setKeyword] = React.useState("");
  const handleFilterChange = (section, value) => {
    console.log(value, section);
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };
  return (
    <>
      <div className="relative ml-2 px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
        <section className="hidden lg:block">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl tracking-wider">filters</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>

            <CardContent className="mt-5 ">
              <ScrollArea className="space-y-7 h-[70vh]">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                  <div className="pt-5">
                    <RadioGroup
                      onValueChange={(value) =>
                        handleFilterChange("category", value)
                      }
                      className="space-y-3"
                      defaultValue="all"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="r1" />
                        <Label htmlFor="r1">all</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fullstack" id="r1" />
                        <Label htmlFor="r1">full stack</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="frontend" id="r2" />
                        <Label htmlFor="r2">frontend</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="backend" id="r3" />
                        <Label htmlFor="r3">backend</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 border-b">Tags</h1>

                  <RadioGroup
                    onValueChange={(value) => handleFilterChange("tag", value)}
                    className="space-y-3 pt-5"
                  >
                    {tags.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <RadioGroupItem value={item} id={`r-${item}`} />
                        <Label htmlFor={`r-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        <section className="projectListSection w-full lg:w-[48rem]">
          <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="relative p-0 w-full">
              <Input
                onChange={handleSearchChange}
                placeholder="Search projects"
                className="40% px-9"
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4" />
            </div>
          </div>
          <div>
            <div className="space-y-5 min-h-[74vh]">
              {keyword
                ? [1, 1, 1].map((item) => (
                    <ProjectCard key={item}/>
                  ))
                : [1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
                    <ProjectCard key={item}/>
                  ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default ProjectList;
