import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Box, IconButton, Text } from "@chakra-ui/react";
import useGlobalStore from "../store";
import { RepoType } from "./GithubRepoSearch";

interface ISelectedRepoBadge {
  repo: RepoType | null;
}
export default function SelectedRepoBadge({ repo }: ISelectedRepoBadge) {
  return (
    <Alert status={repo ? "success" : "error"}>
      <AlertIcon />
      {repo ? (
        <Text>
          🚀 Creating DAO for <strong>{repo?.fullName} </strong> repository.
        </Text>
      ) : (
        <Text>🚀 Please select a repository to continue.</Text>
      )}
    </Alert>
  );
}
