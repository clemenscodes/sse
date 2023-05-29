#!/bin/sh

component="$1"
directory="$2"
project="$3"

if [ -z "$directory" ]; then
    directory="lib"
fi

if [ -z "$project" ]; then
    project="components"
fi

pwd=$(pwd)
lib="$pwd/libs/$project/src"

path="$directory/$component/$component"
file="$path.tsx"
css="$path.module.css"
tsx="$lib/$file"

nx generate @nx/next:component "$component" --directory="$directory" --project="$project" --export -s=css
rm "$lib/$css"
sed -i '1d' "$lib/$file"
sed -i 's/className={[^\}]*}//g' "$lib/$file"
nx format
function_name=$(grep -m 1 -oP '(?<=export function )\w+' "$tsx")
props_interface=$(grep -m 1 -oP '(?<=interface )\w+(?=\s*\{\s*\})' "$tsx")
sed -i "s/export function\(.*\)$/export const $function_name: React.FC<$props_interface> = ({ ...props }) => {/" "$tsx"
sed -i "1i\ import { cn } from '@styles';" "$tsx"
sed -i "s/<div>\(.*\)$/<div className={cn()} {...props}>/" "$tsx"
nx format
