package InvesTour.retrievers;

import InvesTour.Models.StockPriceData;
import InvesTour.utils.Json;
import lombok.SneakyThrows;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

@Service
public class StockRetriver {

    private final OkHttpClient client = new OkHttpClient();

    @SneakyThrows
    public StockPriceData retrieveDataByKeywords(String stockSymbol, String timeInterval) {
        String query = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+stockSymbol+"&interval="+timeInterval+"&outputsize=full&apikey=EOLDHCBBMKYKRBV6";
        Request request = new Request.Builder()
                .url(query)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new RuntimeException("Failed to fetch data from URL: " + response.code());
            }

            return new StockPriceData(Json.parse(response.body().string()));
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch data from URL: " + query);
        }
    }
}
