import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

import {
  Album,
  CreditCard,
  Globe,
  Keyboard,
  LayoutGrid,
  Library,
  ListMusic,
  LogOut,
  Mail,
  MessageSquare,
  Mic,
  Mic2,
  Music,
  Music2,
  PlayCircle,
  Plus,
  PlusCircle,
  Podcast,
  Radio,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../components/ui/menubar";
import { Button } from "../components/ui/button";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
  "I miss Y2K Pop",
  "Runtober",
  "Mellow Days",
  "Eminem Essentials",
];

const listenNowAlbums = [
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1547355253-ff0740f6e8c1?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1606542758304-820b04394ac2?w=300&dpr=2&q=80",
  },
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?w=300&dpr=2&q=80",
  },
];

const madeForYouAlbums = [
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1580428180098-24b353d7e9d9?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1606542758304-820b04394ac2?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1598062548091-a6fb6a052562?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1626759486966-c067e3f79982?w=300&dpr=2&q=80",
  },
  {
    name: "Thinking Components",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=300&dpr=2&q=80",
  },
  {
    name: "Functional Fury",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1606542758304-820b04394ac2?w=300&dpr=2&q=80",
  },
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?w=300&dpr=2&q=80",
  },
];

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });
  console.log(user);

  if (!user) return null;


const Home: NextPage = () => {
  const user = useUser();
  console.log(user);

  const { data } = api.posts.getAll.useQuery();
  const [input, setInput] = useState("");

  //TODO - create a working reacthook for the post

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main> */}
      <div className="overflow-hidden rounded-md border border-slate-200 bg-gradient-to-b from-rose-500 to-indigo-700 shadow-2xl dark:border-slate-800">
        <Menubar className="rounded-none border-b border-none dark:bg-slate-900">
          <MenubarMenu>
            <MenubarTrigger className="font-bold">Music</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>About Music</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Hide Music... <MenubarShortcut>⌘H</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Hide Others... <MenubarShortcut>⇧⌘H</MenubarShortcut>
              </MenubarItem>
              <MenubarShortcut />
              <MenubarItem>
                Quit Music <MenubarShortcut>⌘Q</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="relative">
              File
              {/* <DemoIndicator /> */}
            </MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>New</MenubarSubTrigger>
                <MenubarSubContent className="w-[230px]">
                  <MenubarItem>
                    Playlist <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem disabled>
                    Playlist from Selection{" "}
                    <MenubarShortcut>⇧⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Smart Playlist... <MenubarShortcut>⌥⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>Playlist Folder</MenubarItem>
                  <MenubarItem disabled>Genius Playlist</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>
                Open Stream URL... <MenubarShortcut>⌘U</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Close Window <MenubarShortcut>⌘W</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Library</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Update Cloud Library</MenubarItem>
                  <MenubarItem>Update Genius</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Organize Library...</MenubarItem>
                  <MenubarItem>Export Library...</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Import Playlist...</MenubarItem>
                  <MenubarItem disabled>Export Playlist...</MenubarItem>
                  <MenubarItem>Show Duplicate Items</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Get Album Artwork</MenubarItem>
                  <MenubarItem disabled>Get Track Names</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>
                Import... <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>Burn Playlist to Disc...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
              </MenubarItem>
              <MenubarItem>Convert</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Page Setup...</MenubarItem>
              <MenubarItem disabled>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem disabled>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem disabled>
                Cut <MenubarShortcut>⌘X</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Copy <MenubarShortcut>⌘C</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Paste <MenubarShortcut>⌘V</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Select All <MenubarShortcut>⌘A</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Smart Dictation...{" "}
                <MenubarShortcut>
                  {/* <Mic className="h-4 w-4" /> */}
                </MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Emoji & Symbols{" "}
                <MenubarShortcut>
                  {/* <Globe className="h-4 w-4" /> */}
                </MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem>Show Playing Next</MenubarCheckboxItem>
              <MenubarCheckboxItem checked>Show Lyrics</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset disabled>
                Show Status Bar
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Hide Sidebar</MenubarItem>
              <MenubarItem disabled inset>
                Enter Full Screen
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Account</MenubarTrigger>
            <MenubarContent forceMount>
              <MenubarLabel inset>Switch Account</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioGroup value="benoit">
                <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem inset>Manage Famliy...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Add Account...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div className="p-8">
          <div className="rounded-md bg-white shadow-2xl transition-all dark:bg-slate-900">
            <div className="grid grid-cols-4 xl:grid-cols-5">
              <aside className="pb-12">
                <div className="px-8 py-6">
                  <p className="flex items-center text-2xl font-semibold tracking-tight">
                    <Music className="mr-2" />
                    Music
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="px-6 py-2">
                    <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                      Discover
                    </h2>
                    <div className="space-y-1">
                      <Button
                        variant="subtle"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Home
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Explore
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Radio className="mr-2 h-4 w-4" />
                        Notifications
                      </Button>
                    </div>
                  </div>
                  <div className="px-6 py-2">
                    <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                      Messages
                    </h2>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <ListMusic className="mr-2 h-4 w-4" />
                        Playlists
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Music2 className="mr-2 h-4 w-4" />
                        Songs
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Made for You
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Mic2 className="mr-2 h-4 w-4" />
                        Artists
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Library className="mr-2 h-4 w-4" />
                        Albums
                      </Button>
                    </div>
                  </div>
                  <div className="py-2">
                    <h2 className="relative px-8 text-lg font-semibold tracking-tight">
                      {/* Playlists <DemoIndicator className="right-28" /> */}
                    </h2>
                    <ScrollArea className="h-[230px] px-4">
                      <div className="space-y-1 p-2">
                        {playlists.map((playlist) => (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start font-normal"
                            key={playlist.length}
                          >
                            <ListMusic className="mr-2 h-4 w-4" />
                            {playlist}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </aside>

              <div className="col-span-3 border-l border-l-slate-200 dark:border-l-slate-700 xl:col-span-4">
                <div className="h-full px-8 py-6">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="music" className="relative">
                          {/* Music <DemoIndicator className="right-2" /> */}
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          Live
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <h3 className="text-sm font-semibold">Welcome back</h3>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="relative h-10 w-10 rounded-full"
                          >
                            <Avatar>
                              <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                              />
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            {/* <DemoIndicator className="right-0 top-0" /> */}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-56"
                          align="end"
                          forceMount
                        >
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              <span>Billing</span>
                              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Settings</span>
                              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Keyboard className="mr-2 h-4 w-4" />
                              <span>Keyboard shortcuts</span>
                              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              <span>Team</span>
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <UserPlus className="mr-2 h-4 w-4" />
                                <span>Invite users</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent forceMount>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <TabsContent value="music" className="border-none p-0">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Post whats on your mind
                          </h2>
                          {/* STARTED THE TWEET PAGE */}
                          <div className="h-auto w-3/5 border border-t-0 border-gray-600">
                            <div className="flex">
                              <div className="m-2 flex-1">
                                <h2 className="px-4 py-2 text-xl font-semibold text-white">
                                  Home
                                </h2>
                              </div>
                              <div className="m-2 flex-1 px-4 py-2">
                                <a
                                  href=""
                                  className=" float-right rounded-full text-2xl font-medium text-white hover:bg-blue-800 hover:text-blue-300"
                                >
                                  <svg
                                    className="m-2 h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <g>
                                      <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
                                    </g>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                          <hr className="border-gray-600" />
                          {/* <!--middle creat tweet--> */}
                          <div className="flex">
                            <div className="m-2 w-10 py-1">
                              {/* change to image tag using nextjs */}
                              <img
                                className="inline-block h-10 w-10 rounded-full"
                                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                alt="image"
                              />
                            </div>
                            <div className="mt-2 flex-1 px-2 pt-2">
                              <input
                                className=" w-full bg-transparent text-lg font-medium text-gray-400"
                                placeholder="Whats Happening"
                                width={56}
                                height={56}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (input !== "") {
                                      // mutate({ content: input });
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                          {/* <!--middle creat tweet below icons--> */}
                          <div className="flex">
                            <div className="w-10"></div>

                            <div className="w-64 px-2">
                              `
                              <div className="flex items-center">
                                <div className="m-2 flex-1 px-1 py-1 text-center">
                                  <a
                                    href="#"
                                    className="group mt-1 flex items-center rounded-full px-2 py-2 text-base font-medium leading-6 text-blue-400 hover:bg-blue-800 hover:text-blue-300"
                                  >
                                    <svg
                                      className="h-7 w-6 text-center"
                                      fill="none"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                  </a>
                                </div>

                                <div className="m-2 flex-1 py-2 text-center">
                                  <a
                                    href="#"
                                    className="group mt-1 flex items-center rounded-full px-2 py-2 text-base font-medium leading-6 text-blue-400 hover:bg-blue-800 hover:text-blue-300"
                                  >
                                    <svg
                                      className="h-7 w-6 text-center"
                                      fill="none"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                  </a>
                                </div>

                                <div className="m-2 flex-1 py-2 text-center">
                                  <a
                                    href="#"
                                    className="group mt-1 flex items-center rounded-full px-2 py-2 text-base font-medium leading-6 text-blue-400 hover:bg-blue-800 hover:text-blue-300"
                                  >
                                    <svg
                                      className="h-7 w-6 text-center"
                                      fill="none"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                  </a>
                                </div>

                                <div className="m-2 flex-1 py-2 text-center">
                                  <a
                                    href="#"
                                    className="group mt-1 flex items-center rounded-full px-2 py-2 text-base font-medium leading-6 text-blue-400 hover:bg-blue-800 hover:text-blue-300"
                                  >
                                    <svg
                                      className="h-7 w-6 text-center"
                                      fill="none"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="flex-1">
                              <button className="float-right mr-8 mt-5 rounded-full bg-blue-400 px-8 py-2 font-bold text-white hover:bg-blue-600">
                                Tweet
                              </button>
                            </div>
                          </div>
                          `
                          <hr className="border-4 border-blue-800" />
                          {/* ENDING THE TWEET PAGE */}
                          <input
                            placeholder="Anything you want just post it"
                            type="text"
                            className="grow bg-transparent outline-none"
                            //TODO: add values in a few
                            // value=
                            //onKeyDown=
                          />
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      {/* <Separator className="my-4" /> */}
                      <div className="relative">
                        {/* <DemoIndicator className="right-auto left-24 top-32 z-30" /> */}
                        <div className="relative flex space-x-4">
                          {/* {listenNowAlbums.map((album) => (
                          <AlbumArtwork
                            key={album.name}
                            album={album}
                            className="w-[250px]"
                          />
                        ))} */}
                        </div>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Made for You
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Your personal playlists. Updated daily.
                        </p>
                      </div>
                      {/* <Separator className="my-4" /> */}
                      <div className="relative">
                        {/* <DemoIndicator className="top-32 right-auto left-16 z-30" /> */}
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {/* {madeForYouAlbums.map((album) => (
                            <AlbumArtwork
                              key={album.name}
                              album={album}
                              className="w-[150px]"
                              aspectRatio={1 / 1}
                            />
                          ))} */}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      {/* <Separator className="my-4" /> */}
                      <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 dark:border-slate-700">
                        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                          <Podcast className="h-10 w-10 text-slate-400" />
                          <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                            No episodes added
                          </h3>
                          <p className="mb-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                            You have not added any podcasts. Add one below.
                          </p>
                          <Dialog>
                            <DialogTrigger>
                              <Button size="sm" className="relative">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Podcast
                                {/* <DemoIndicator className="-top-1 -right-1 z-30" /> */}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Podcast</DialogTitle>
                                <DialogDescription>
                                  Copy and paste the podcast feed URL to import.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  {/* <Label htmlFor="url">Podcast URL</Label> */}
                                  {/* <Input
                                  id="url"
                                  placeholder="https://example.com/feed.xml"
                                /> */}
                                </div>
                              </div>
                              <DialogFooter>
                                <Button>Import Podcast</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>
          <div>
            {data?.map((post) => (
              <div key={post.id}>{post.content}</div>
            ))}
          </div> */}

      {/* </main> */}
    </>
  );
};

export default Home;
