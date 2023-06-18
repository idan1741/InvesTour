package InvesTour.Runnables;

import InvesTour.Models.Stock;
import InvesTour.Services.StocksService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockPricesRunnable implements Runnable{
    @Autowired
    StocksService stocksService;
    Long sleepDuration = (long) (15 * 1000);


    @Override
    public void run() {
        while(true){
            try {
                this.updateStocksPrices();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void updateStocksPrices() throws InterruptedException {
        System.out.println("start loop of updates");
        List<Stock> allStocks = this.stocksService.getAllStocks();
        for (int i = 0; i < allStocks.size(); i++){
            String symbol = allStocks.get(i).getSymbol();
            double currentPrice = stocksService.getCurrentPriceForUpdate(symbol);
            double change = this.calculatePercentageChange(allStocks.get(i).getPrice(),currentPrice);
            stocksService.updateCurrentPrice(symbol, currentPrice, change);
            System.out.println("update price of - " + symbol + " to price of - " + currentPrice );
            Thread.sleep(sleepDuration);
        }
    }

    private double calculatePercentageChange(double oldValue, double newValue) {
        double change = newValue - oldValue;
        return (change / oldValue) * 100.0;
    }
}
