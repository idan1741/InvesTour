package InvesTour.Services;

import InvesTour.Models.Stock;
import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataService {
    private final String TWEETS_SERVICE_URL = "http://localhost:5000/tweets";

    private final String SENTIMENT_ANALYSIS_SERVICE_URL = "http://localhost:5000/sentimentScore";

    public JsonNode getTweetsByStock(String stockName) {
        JsonNode payload = Json.newObject().put("keywords", stockName)
                .put("likesMin", "10");
        JsonNode res = Json.newObject();
        StringEntity entity = new StringEntity(payload.toString(), ContentType.APPLICATION_JSON);

        try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            HttpPost request = new HttpPost(TWEETS_SERVICE_URL);
            request.setEntity(entity);

            HttpResponse response = (HttpResponse) httpClient.execute(request);

            String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");
            res = Json.parse(responseString);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return res;
    }

    public JsonNode getTweetsByListOfStocks(List<Stock> stocks) {
        String stocksList = "";
        for (Stock stock : stocks) {
            stocksList += stock.getName() + " ";
        }
        JsonNode payload = Json.newObject().put("keywords", stocksList);
        JsonNode res = Json.newObject();
        StringEntity entity = new StringEntity(payload.toString(), ContentType.APPLICATION_JSON);

        try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            HttpPost request = new HttpPost(TWEETS_SERVICE_URL);
            request.setEntity(entity);

            HttpResponse response = (HttpResponse) httpClient.execute(request);

            String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");
            res = Json.parse(responseString);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return res;
    }

    public int getSentimentScore(String string) {
        JsonNode payload = Json.newObject().put("description", string);
        JsonNode res = Json.newObject();
        StringEntity entity = new StringEntity(payload.toString(), ContentType.APPLICATION_JSON);

        try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            HttpPost request = new HttpPost(SENTIMENT_ANALYSIS_SERVICE_URL);
            request.setEntity(entity);

            HttpResponse response = (HttpResponse) httpClient.execute(request);

            String responseString = EntityUtils.toString(response.getEntity(), "UTF-8");
            res = Json.parse(responseString);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return res.path("sentiment_score").asInt();
    }
}
