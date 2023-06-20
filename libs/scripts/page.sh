#!/bin/sh

pwd=$(pwd)
lib="$pwd/libs/pages/src"

page="$1"
directory="$2"

if [ -z "$directory" ]; then
    directory="lib"
fi

path="$directory/$page/$page"
file="$path.tsx"
css="$path.module.css"
tsx="$lib/$file"

nx generate @nx/next:component "$page" --directory="$directory" --project=pages --export -s=css
rm "$lib/$css"
sed -i '1d' "$tsx"
sed -i 's/className={[^\}]*}//g' "$tsx"
nx format --all
function_name=$(grep -m 1 -oP '(?<=export function )\w+' "$tsx")
props_interface=$(grep -m 1 -oP '(?<=interface )\w+(?=\s*\{\s*\})' "$tsx")
sed -i "1i\ import { NextPage } from 'next';" "$tsx"
sed -i "s/export function\(.*\)$/export const $function_name: NextPage<$props_interface> = ({ ...props }) => {/" "$tsx"
sed -i "1i\ import { cn } from '@styles';" "$tsx"
sed -i "s/<div>\(.*\)$/<div className={cn()} {...props}>/" "$tsx"
nx format --all
