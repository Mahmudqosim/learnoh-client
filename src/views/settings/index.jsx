import { Tab } from "@headlessui/react"
import ChangePassword from "./components/ChangePassword"
import UpdateProfile from "./components/UpdateProfile"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Settings = () => {
  const tabs = ["Update Profile", "Change Password"]

  return (
    <div className="py-6 px-12 w-full mb-12">
      <h1 className="font-bold text-2xl text-gray-700 pb-5 border-b border-gray-200">
        Settings
      </h1>

      <div className="w-full mt-6">
        <Tab.Group>
          <Tab.List className="flex bg-white">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "w-full md:w-60 p-4 text-md font-medium leading-5",
                    selected
                    ? "bg-black text-gray-50 hover:bg-opacity-50"
                    : "border-b-4 border-gray-800 bg-gray-50 text-gray-800"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-2">

            <Tab.Panel>
              <UpdateProfile />
            </Tab.Panel>

            <Tab.Panel>
              <ChangePassword />
            </Tab.Panel>
            
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Settings
