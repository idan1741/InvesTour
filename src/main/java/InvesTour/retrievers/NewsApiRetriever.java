package InvesTour.retrievers;

import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.jzhangdeveloper.newsapi.net.NewsAPI;
import com.jzhangdeveloper.newsapi.net.NewsAPIClient;
import com.jzhangdeveloper.newsapi.net.NewsAPIResponse;
import com.jzhangdeveloper.newsapi.params.EverythingParams;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class NewsApiRetriever implements Retriever {
    private final NewsAPIClient client;
    private final String API_KEY = "ce4176c6dd1a453a87ffbce222551845";

    @Autowired
    public NewsApiRetriever() {
        this.client = NewsAPI.newClientBuilder()
                .setApiKey(API_KEY)
                .build();
    }

    @SneakyThrows
    @Override
    public JsonNode retrieveDataByKeywords(List<String> keywords) {
        Map<String, String> everythingParams = EverythingParams.newBuilder()
                .setPageSize(100)
                .setSearchQuery(String.join(",", keywords))
                .build();

        NewsAPIResponse response = this.client.getEverything(everythingParams);

        assertSuccessful(response.getStatusCode());

        return Json.toJson(response.getBody());
    }

    private void assertSuccessful(int statusCode) {
        int OK_CODE = 200;
        if (statusCode != OK_CODE) {
            throw new RuntimeException("Failed to fetch data from News Api, return code: " + statusCode);
        }
    }
}
