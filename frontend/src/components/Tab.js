"use client"

import { Tabs } from "../ui/TabUi"
import  '../styles/Tab.css'

export default function TabsDemo() {
  const tabs = [
    {
      title: "Manage",
      value: "Manage",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Manage tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Table",
      value: "Table",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Table tab</p>
          <DummyContent2/>
        </div>
      ),
    },
    {
      title: "leaderboard",
      value: "leaderboard",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>leaderboardtab</p>
          <DummyContent3 />
        </div>
      ),
    },
    {
      title: "Chart",
      value: "Chart",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Chart tab</p>
          <DummyContent4 />
        </div>
      ),
    },
    {
      title: "Report Genetate",
      value: "Report Genetate",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Report Genetate</p>
          <DummyContent5 />
        </div>
      ),
    },
  ]

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  )
}

const DummyContent = () => {
  return (
    <img
      src="../../public/manage.png"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  )
}
const DummyContent2 = () => {
  return (
    <img
      src="../../public/table.png"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  ) 
}


const DummyContent3 = () => {
  return (
    <img
      src="https://aicdn.picsart.com/f43be47b-0bb6-410d-901c-a369b7fa2760.png"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  )
}

const DummyContent4 = () => {
  return (
    <img
      src="https://iili.io/3kXRng2.png"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  )
}

const DummyContent5 = () => {
  return (
    <img
      src="https://iili.io/3kjhyG4.png"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  )
}

