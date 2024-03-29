package InvesTour.retrievers;

import InvesTour.Models.Website;
import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.SneakyThrows;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UrlRetriever implements Retriever {
    private final OkHttpClient client = new OkHttpClient();

    private final String API_KEY = "7743e801ec3e4a27a7724d8e3669470c";
    private final String NEWS_API_URL = "https://newsapi.org/v2";

    @Override
    @SneakyThrows
    public JsonNode retrieveDataByKeywords(List<String> keywords) {
        String url = NEWS_API_URL + "/everything?q=" + joinString(keywords, " OR ") + "&language=en&apiKey=" + API_KEY;
        return getJsonBodyByUrl(url);
    }

    @SneakyThrows
    public JsonNode retrieveDataByStocksKeywordsAndWebsites(List<String> stocks, List<Website> websites) {
        List<String> websiteIds = websites.stream().map(Website::getWebsiteId).collect(Collectors.toList());
        String url = NEWS_API_URL + "/everything?q=" + joinString(stocks, " OR ") +
                "&sources=" + joinString(websiteIds, ",") + "&language=en&apiKey=" + API_KEY;
        return getJsonBodyByUrl(url);
    }

    private String joinString(List<String> strings, String delimiter) {
        return String.join(delimiter, strings);
    }

    public JsonNode retrieveAllAvailableWebsites() {
        String url = NEWS_API_URL + "/top-headlines/sources?apiKey=" + API_KEY;
        return getJsonBodyByUrl(url);
    }

    private JsonNode getJsonBodyByUrl(String url) {
        Request request = new Request.Builder()
                .url(url)
                .build();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("Failed to fetch data from URL: " + response.code());
            }
            return Json.parse(response.body().string());
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from URL: " + url);
        }
    }
}
