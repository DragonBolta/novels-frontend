import {useMantineColorScheme, ThemeIcon, useMantineTheme} from "@mantine/core";
import {Moon, SunDim} from "@phosphor-icons/react";
import {CenteredInternalLink} from "@/components/ui/centered-link.tsx";

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

    return (
        <>
            <div className="flex flex-row h-1/6 w-full items-center justify-evenly m-3 md:pr-6 md:justify-end">
                <div className={"md:w-[100px]"}>
                    <CenteredInternalLink label="Home" route={"/"}/>
                </div>
                <div className={"md:w-[100px]"}>
                    <CenteredInternalLink label="Novels" route={"/novels/"}/>
                </div>
                <div className={"md:w-[100px]"}>
                    <CenteredInternalLink label="Search" route={"/search/"}/>
                </div>
                <div className={"flex items-center justify-center"}>
                    <ThemeIcon variant={"transparent"} classNames = {{root: "flex justify-center items-center"}} autoContrast onClick={handleColorScheme} color={color}>
                        {colorScheme == "light" ? <SunDim size={26}/> : <Moon size={26}/>}
                    </ThemeIcon>
                </div>
            </div>
        </>
    )
}

export default HeaderBar;