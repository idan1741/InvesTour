package InvesTour.Services;

import InvesTour.Models.Stock;
import InvesTour.Models.StockPriceData;
import InvesTour.dal.StocksRepository;
import InvesTour.retrievers.StockRetriver;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StocksService {

    private final StocksRepository repository;

    private final StockRetriver stockRetriver;

    public List<Stock> getAllStocks(){
        return repository.getAllStocks();
    }

    public boolean isStockExist(long stockId) {
        return this.repository.isStockExist(stockId);
    }

    public List<Stock> getAllStocksByUser(String email){
        return repository.getFullStocksByUserEmail(email);
    }

    public StockPriceData getStockRealTimeData(String symbol, String timeInterval){
       return this.stockRetriver.retrieveDataByKeywords(symbol,timeInterval);
    }

    public double getCurrentPrice(String stockSymbol){
        return this.stockRetriver.retrieveStockCurrentPrice(stockSymbol);
    }
}
