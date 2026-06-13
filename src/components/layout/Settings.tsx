import { Fragment, type ComponentProps } from "react"

import { ChevronRightIcon } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import type { SettingsItem } from "@/types/misc"

const Settings = (props: ComponentProps<typeof Item>) => {
  const menuItems = [
    {
      title: "Actions",
      items: [] as SettingsItem[],
    },
  ]

  return (
    <ItemGroup {...props}>
      {menuItems.map((group, index) => (
        <Fragment key={index}>
          {index > 0 && <ItemSeparator />}
          {group.items.map((item, index) => (
            <Item key={index} size="sm" asChild>
              <a onClick={item.onClick}>
                <ItemMedia variant="icon">
                  <item.icon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon size={16} />
                </ItemActions>
              </a>
            </Item>
          ))}
        </Fragment>
      ))}
    </ItemGroup>
  )
}

export default Settings
