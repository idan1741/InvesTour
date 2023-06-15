package InvesTour.Controllers;

import InvesTour.Models.Stock;
import InvesTour.Services.DataService;
import InvesTour.Services.StocksService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class DataController {

    private final DataService dataService;
    private final StocksService stocksService;

    @GetMapping(value = "/main/graph")
    public void getGraph() {

    }

    @GetMapping(value = "/graph/user/{userId}")
    public void getGraphForUser(@PathVariable("userId") Long id) {

    }

    @GetMapping(value = "/graph/stock/{stockName}")
    public void getGraphForStock(@PathVariable("stockName") String stockName) {

    }

    @GetMapping(value = "/messages/stock/{stockName}")
    public void getMessagesForStock(@PathVariable("stockName") String stockName) {

    }

    @GetMapping(value = "/updates/stock/{stockName}")
    public void getUpdatesForStock(@PathVariable("stockName") String stockName) {


    }

    @GetMapping(value = "/tweets/stock/{stockName}")
    public JsonNode getTweetsByStock(@PathVariable("stockName") String stockName) {
        return dataService.getTweetsByStock(stockName);
    }

    @GetMapping(value = "/tweets/user/{userEmail}")
    public JsonNode getTweetsByUserId(@PathVariable("userEmail") String userEmail) {
        List<Stock> stocks = stocksService.getAllStocksByUser(userEmail);

        return dataService.getTweetsByListOfStocks(stocks);
    }

    @GetMapping(value = "/posts/stock/{stockName}")
    public JsonNode getPostsByStock(@PathVariable("stockName") String stockName) {
        return dataService.getPostsByStock(stockName);
    }

    @GetMapping(value = "/posts/user/{userEmail}")
    public JsonNode getPostsByUserId(@PathVariable("userEmail") String userEmail) {
        List<Stock> stocks = stocksService.getAllStocksByUser(userEmail);

        return dataService.getPostsByListOfStocks(stocks);
    }
}
