import {useMantineColorScheme, ThemeIcon, useMantineTheme, NavLink} from "@mantine/core";
import { Moon, SunDim } from "@phosphor-icons/react";
import { CenteredInternalLink } from "@/components/ui/centered-link.tsx";
import { Switch } from '@mantine/core';
import {useState} from "react";
import {logout} from "@/lib/auth.ts";


const HeaderBar = () => {
    const theme = useMantineTheme();
    const {colorScheme, setColorScheme} = useMantineColorScheme();
    const color = colorScheme === 'dark' ? theme.white : theme.black;

    const handleColorScheme = () => {
        if (colorScheme == "light") {
            setColorScheme("dark");
        }
        else {
            setColorScheme("light");
        }
    }
    const signedIn= localStorage.getItem('username');
    const [checked, setChecked] = useState(localStorage.getItem('nsfw') === "true");

    const toggleNSFW = (checked: string | boolean | ((prevState: boolean) => boolean)) => {
        setChecked(!!checked);
        localStorage.setItem('nsfw', checked.toString());

        window.location.reload();
    }

    return (
        <>
            <div className="flex flex-row h-1/6 w-full items-center justify-evenly p-3 md:pr-6 md:justify-end">
                <div className={"md:w-[100px]"}>
                    <CenteredInternalLink label="Home" route={"/"}/>
                </div>
                <div className={"md:w-[100px]"}>
                    <CenteredInternalLink label="Novels" route={"/novels/"}/>
                </div>
                <div className={"md:w-[100px]"}>
                    <CenteredInternalLink label="Search" route={"/search/"}/>
                </div>
                {
                    signedIn ? (
                        <>
                            <div className={"md:w-[100px]"}>
                                <CenteredInternalLink label={signedIn} route={"/"}/>
                            </div>
                            <div className={"md:w-[100px]"}>
                                <p>{checked}</p>
                                <Switch label={"NSFW"} labelPosition={"left"} checked={checked}
                                        onChange={(event) => toggleNSFW(event.currentTarget.checked)}/>
                            </div>
                            <div>
                                <NavLink
                                    classNames={{
                                        label: "flex justify-center items-center w-fit text-center",
                                        body: "flex w-fit items-center justify-center",
                                        root: "w-full"
                                    }}
                                    label={"Log out"} onClick={logout}/>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={"md:w-[100px]"}>
                                <CenteredInternalLink label={"Login"} route={"/auth"}/>
                            </div>
                        </>
                    )
                }
                <div className={"flex items-center justify-center md:ml-4"}>
                    <ThemeIcon variant={"transparent"} classNames={{root: "flex justify-center items-center"}}
                               autoContrast onClick={handleColorScheme} color={color}>
                        {colorScheme == "light" ? <SunDim size={26}/> : <Moon size={26}/>}
                    </ThemeIcon>
                </div>
            </div>
        </>
    )
}

export default HeaderBar;