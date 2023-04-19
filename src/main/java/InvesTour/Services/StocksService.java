package InvesTour.Services;

import InvesTour.dal.StocksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StocksService {

    private final StocksRepository stocksRepository;

    public boolean isStockExist(long stockId) {
        return !(stocksRepository.getStockById(stockId) == null);
    }
}
