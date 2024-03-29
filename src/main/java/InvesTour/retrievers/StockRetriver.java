package InvesTour.retrievers;

import InvesTour.Models.StockPriceData;
import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.SneakyThrows;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class StockRetriver {

    private final OkHttpClient client = new OkHttpClient();

    Map<String, String> funcMap;
    Map<String, String> timeMap;

    public StockRetriver() {
        this.funcMap = Map.of("day","TIME_SERIES_INTRADAY",
                "week", "TIME_SERIES_INTRADAY",
                "month", "TIME_SERIES_INTRADAY",
                "year", "TIME_SERIES_WEEKLY",
                "years", "TIME_SERIES_MONTHLY");

        this.timeMap = Map.of("day","5min",
                "week", "5min",
                "month", "60min",
                "year", "60min",
                "years", "60min");
    }

    @SneakyThrows
    public StockPriceData retrieveDataByKeywords(String stockSymbol, String timeInterval) {
        String query = "https://www.alphavantage.co/query?function="+this.funcMap.get(timeInterval)+"&symbol="+stockSymbol+"&interval="+this.timeMap.get(timeInterval)+"&outputsize=full&apikey=EOLDHCBBMKYKRBV6";
        Request request = new Request.Builder()
                .url(query)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("Failed to fetch data from URL: " + response.code());
            }

            return new StockPriceData(Json.parse(response.body().string()), timeInterval);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from URL: " + query);
        }
    }

    @SneakyThrows
    public Double retrieveStockCurrentPrice(String stockSymbol) {
        String query = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+stockSymbol+"&apikey=R3G67RHMA2PL9THG";
        Request request = new Request.Builder()
                .url(query)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("Failed to fetch data from URL: " + response.code());
            }
            JsonNode jsonNode = Json.parse(response.body().string());
            return jsonNode.path("Global Quote").path("05. price").asDouble();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from URL: " + query);
        }
    }

    @SneakyThrows
    public Double retrieveStockCurrentPriceForUpdates(String stockSymbol) {
        String query = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+stockSymbol+"&apikey=Q896XGE57D3K67UA";
        Request request = new Request.Builder()
                .url(query)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("Failed to fetch data from URL: " + response.code());
            }
            JsonNode jsonNode = Json.parse(response.body().string());
            return jsonNode.path("Global Quote").path("05. price").asDouble();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from URL: " + query);
        }
    }
}
