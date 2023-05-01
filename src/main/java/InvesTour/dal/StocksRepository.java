package InvesTour.dal;

import InvesTour.Models.Stock;
import InvesTour.Services.StocksService;
import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;

@Repository
@RequiredArgsConstructor
public class StocksRepository {
    private final DSLContext dsl;

    public List<String> getStockNamesByUserEmail(String userEmail) {
        return this.dsl.select(field("key_word"))
                .from(table("investour.tbl_stocks"))
                .where(field("id")
                        .in(this.dsl.select(field("stock_id"))
                                .from("investour.tbl_stock_preferences")
                                .where(field("user_email").eq(userEmail))))
                .fetchInto(String.class);
    }

    public boolean isStockExist(long stockId) {
        return this.dsl.fetchExists(
                this.dsl.selectFrom(table("investour.tbl_stocks"))
                        .where(field("id").eq(stockId))
        );
    }

    public List<Stock> getAllStocks() {
        return this.dsl.select()
                .from(table("investour.tbl_stocks"))
                .fetchInto(Stock.class);
    }

    public List<Stock> getFullStocksByUserEmail(String userEmail) {
        return this.dsl.select()
                .from(table("investour.tbl_stocks"))
                .where(field("id")
                        .in(this.dsl.select(field("stock_id"))
                                .from("investour.tbl_stock_preferences")
                                .where(field("user_email").eq(userEmail))))
                .fetchInto(Stock.class);
    }
}
