package InvesTour.Services;

import InvesTour.Models.Article;
import InvesTour.dal.StocksRepository;
import InvesTour.retrievers.UrlRetriever;
import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NewsService {
    private final UrlRetriever retriever;
    private final StocksRepository stocksRepository;

    @SneakyThrows
    public Optional<List<Article>> getHotStocksArticles(List<String> hotStocks) {
        JsonNode hotStocksData = this.retriever.retrieveDataByKeywords(hotStocks);

        return getStocksArticles(hotStocksData);
    }

    public Optional<List<Article>> getStocksArticlesByUser(String email) {
        List<String> userStocks = stocksRepository.getStocksByUserEmail(email);

        JsonNode userStocksData = this.retriever.retrieveDataByKeywords(userStocks);

        return getStocksArticles(userStocksData);
    }

    @SneakyThrows
    private Optional<List<Article>> getStocksArticles(JsonNode stocksData) {
        if (isValidData(stocksData)) {
            return Optional.of(Json.stream(stocksData.get("articles"))
                    .map(Article::fromJson)
                    .collect(Collectors.toList()));
        } else {
            throw new RuntimeException("News api return invalid data");
        }
    }

    private boolean isValidData(JsonNode data) {
        String articlesField = "articles";
        String statusField = "status";

        return data.get(statusField).asText().equals("ok") &&
                data.has(articlesField) &&
                data.get(articlesField).isArray() &&
                !data.get(articlesField).isEmpty();
    }
}
