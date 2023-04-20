import {useState, useEffect} from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  CheckboxGroup,
  Checkbox,
  Flex
} from '@chakra-ui/react'
import http from '../../../../utilities/http'

export const Filter = ({
  sources,
  appliedFilter,
  setAppliedFilter,
}: {
  sources: string[];
  appliedFilter: {
    sources: string[]
  }
  setAppliedFilter: any;
}) => {
  const [selectedSources, setSelectedSources] = useState<any[]>([]);

  useEffect(() => {
    setAppliedFilter({
      ...appliedFilter,
      sources: selectedSources
    });
  }, [selectedSources]);

  return (
    <>
      {sources.length > 0 && (
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} size={"sm"}>Sources</MenuButton>
          <MenuList>
            <MenuItem>
              <CheckboxGroup
                defaultValue={sources}
                value={selectedSources}
                onChange={(value) => setSelectedSources(value)}
              >
                <Flex direction={"column"}>
                  {sources.map((source) => (
                    <Checkbox key={source} value={source}>
                      {source}
                    </Checkbox>
                  ))}
                </Flex>
              </CheckboxGroup>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};
