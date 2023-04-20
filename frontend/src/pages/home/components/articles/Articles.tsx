import {useEffect, useState} from 'react'
import { Box, Flex, Text, Button, Image, Link, Spinner, useToast } from "@chakra-ui/react";
import Card from '../../../../components/card/Card'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import http from '../../../../utilities/http';
import { Filter } from '../filter/Filter';
import { Pagination } from '../pagination/Pagination';

const Articles = () => {
  const controller = new AbortController();
  const toast = useToast();
  const feedType = useSelector((state: RootState) => state.feed.type);
  const preferences = useSelector((state: RootState) => state.user.preferences)
  const [articles, setArticles] = useState<any[]>([]);
  const [isInProgress, setIsInProgress] = useState<boolean>(false)
  const [filter, setFilter] = useState<{sources: string[]}>({
    sources: []
  });
  const [appliedFilter, setAppliedFilter] = useState<{sources: string[]}>({
    sources: []
  })
  const [displayArticles, setDisplayArticles] = useState<any[]>([])
  const [meta, setMeta] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1)

  const genericErrorHandler = () => {
    toast({
      title: "Something went wrong.",
      status: "error",
    });
  }

  const getArticles = (): void => {
    setIsInProgress(true)
    if (feedType === "generic") {
      // controller.abort()
      http.get("/articles", {
        // signal: controller.signal,
        params: {
          page: currentPage
        }
      }).then((response) => {
        setMeta(response.data.meta)
        setArticles(response.data.data)
        setIsInProgress(false)
      }).catch(genericErrorHandler)
    } else if (feedType === "specific") {
      // controller.abort()
      http.get("/articles", {
        // signal: controller.signal,
        params: {
          sources: preferences?.sources,
          page: currentPage
        }
      }).then((response) => {
        setMeta(response.data.meta)
        setArticles(response.data.data)
        setIsInProgress(false)
      }).catch(genericErrorHandler)
    } else {
      // controller.abort()
      http.get("/search", {
        // signal: controller.signal,
        params: {
          keyword: feedType,
          page: currentPage
        }
      }).then((response) => {
        setMeta(response.data.meta)
        setArticles(response.data.data)
        setIsInProgress(false)
      }).catch(genericErrorHandler)
    }
  }

  useEffect(() => {
    getArticles()
  }, [feedType, preferences, currentPage])

  useEffect(() => {
    setDisplayArticles(articles)

    const filter: {
      sources: string[]
    } = {
      sources: []
    }
    articles.forEach((article) => {
      if (!filter.sources.includes(article?.source)) {
        filter.sources.push(article.source)
      }
    })

    setFilter(filter)
  }, [articles])


  useEffect(() => {
    if (appliedFilter.sources?.length > 0) {
      const displayArticles = articles.filter((article) =>
        appliedFilter.sources.includes(article.source)
      );
      setDisplayArticles(displayArticles)
    }
  }, [appliedFilter])
  
  

  return (
    <Box>
      {!isInProgress && (
        <Flex width={"100%"} padding={2.5} justifyContent={"space-between"} wrap={"wrap"}>
          {filter.sources.length > 0 && (
            <Box width={{base: "100%", md: "fit-content"}}>
              <Filter
                {...filter}
                appliedFilter={appliedFilter}
                setAppliedFilter={setAppliedFilter}
              />
            </Box>
          )}

          {meta && (
            <Box width={{base: "100%", md: "fit-content"}} paddingTop={{base: 5, md: 0}}>
              <Pagination meta={meta} setCurrentPage={setCurrentPage} />
            </Box>
          )}

          
        </Flex>
      )}

      {isInProgress && (
        <Box textAlign={"center"} paddingY={5}>
          <Spinner marginY={"auto"} size="xl" />
        </Box>
      )}

      <Flex wrap={"wrap"} direction={"row"}>
        {displayArticles.length > 0 &&
          displayArticles.map((article: any) => (
            <Box key={article.uuid} width={{base: "100%", md: "50%"}} padding={2.5}>
              <Card textAlign={"left"} marginBottom={5}>
                <Flex justifyContent={"center"}>
                  <Image src={article.imageUrl} />
                </Flex>

                <Text marginTop={5} fontSize={"1.5rem"}>
                  {article.title}
                </Text>
                <Flex
                  width={"100%"}
                  marginTop={5}
                  justifyContent={"space-between"}
                >
                  <Text fontWeight={"bold"}>
                    {article.author} <br /> {article.source}
                  </Text>
                  <Text fontWeight={"bold"}>
                    {article.publishedAt.split("T")[0]}
                  </Text>
                </Flex>
                <Text marginTop={5}>{article.description}</Text>
                <Box marginTop={5} textAlign={"right"}>
                  <Link href={article.sourceUrl} isExternal>
                    <Button size={"sm"}>Read more</Button>
                  </Link>
                </Box>
              </Card>
            </Box>
          ))}
      </Flex>
    </Box>
  );
}

export default Articles