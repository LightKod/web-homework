'use client'

import clsx from "clsx"
import { useState } from "react"

export default function Logo() {
    const [verySecretBgImage, setVerySecretBgImage] = useState<boolean>(false)

    return (
        <div onClick={() => setVerySecretBgImage((prev) => !prev)} className={clsx(
            "w-full flex items-end p-4 rounded-md relative overflow-hidden",
            {
              "bg-gradient-to-tr from-violet-600 to-sky-600 h-48": !verySecretBgImage,
              "h-96 bg-cover bg-no-repeat bg-center bg-[url('https://64.media.tumblr.com/37793d1130587f23a1a96e09f45956d3/1180627617cec052-77/s500x750/0978efa9ec52aa9cd87139cbca52f9dfb77ef4ee.jpg')]": verySecretBgImage
            }
        )}>
            <h1 className="text-violet-50 text-3xl font-extrabold md:text-4xl">{verySecretBgImage ? "Tasks are everywhere ahhh" : "Todo App (Ver 3)"}</h1>
            <img src="/complete_mark.png" alt="backdrop" className={clsx(
              "absolute z-10 -top-24 -right-24 -rotate-[25deg] w-72 md:w-96",
              {
                "hidden": verySecretBgImage
              }
            )}/>
        </div>
    )
}