package InvesTour.Services;

import InvesTour.Models.Stock;
import InvesTour.dal.FacebookRepository;
import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.List;

@Service
public class DataService {
    private ObjectMapper mapper = new ObjectMapper();
    private final String TWEETS_SERVICE_URL = "http://localhost:5000/tweets";

    private final String SENTIMENT_ANALYSIS_SERVICE_URL = "http://localhost:5000/sentimentScore";

    private final FacebookRepository facebookRepository = new FacebookRepository();

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

    public JsonNode getPostsByStock(String stockName) {
        switch (stockName) {
            case "NFLX":
                return facebookRepository.getNetflixPosts();
            case "SBUX":
                return facebookRepository.getStarbucksPosts();
            case "NVDA":
                return facebookRepository.getNvidiaPosts();
            case "APPL":
                return facebookRepository.getApplePosts();
            case "TSLA":
                return facebookRepository.getTeslaPosts();
            default:
                return Json.parse("");
        }
    }

    public JsonNode getPostsByListOfStocks(List<Stock> stocks) {
        ArrayNode objectNode = mapper.createArrayNode();

        for (Stock stock : stocks) {
            JsonNode res = this.getPostsByStock(stock.getSymbol());
            objectNode.add(res);
        }

        return objectNode.get(0);
    }

    public JsonNode getTweetsByListOfStocks(List<Stock> stocks) {
        String stocksList = "";
        for (int i = 0; i < stocks.size() - 1; i++) {
            stocksList += stocks.get(i).getSymbol() + " OR ";
        }

        stocksList += stocks.get(stocks.size() - 1).getSymbol();
        JsonNode payload = Json.newObject().put("keywords", stocksList).put("likesMin", "10");
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
