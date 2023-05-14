package InvesTour.retrievers;

import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.SneakyThrows;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UrlRetriever implements Retriever {
    private final OkHttpClient client = new OkHttpClient();

    private final String API_KEY = "ce4176c6dd1a453a87ffbce222551845";
    private final String NEWS_API_URL = "https://newsapi.org/v2";

    @Override
    @SneakyThrows
    public JsonNode retrieveDataByKeywords(List<String> keywords) {
        String url = NEWS_API_URL + "/everything?q=" + String.join(",%20", keywords) + "&language=en&apiKey=" + API_KEY;

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
    public JsonNode retrieveNewsWebsite() {
        String url = NEWS_API_URL + "/top-headlines/sources?apiKey=" + API_KEY;
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
