package InvesTour.Services;

import InvesTour.Models.Stock;
import InvesTour.dal.StocksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StocksService {

    private final StocksRepository repository;

    public List<Stock> getAllStocks(){
        return repository.getAllStocks();
    }

    public boolean isStockExist(long stockId) {
        return this.repository.isStockExist(stockId);
    }

    public List<Stock> getAllStocksByUser(String email){
        return repository.getFullStocksByUserEmail(email);
    }
}
