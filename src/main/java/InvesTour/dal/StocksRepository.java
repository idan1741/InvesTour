package InvesTour.dal;

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

    public List<String> getStocksByUserEmail(String userEmail) {
        return this.dsl.select(field("name"))
                .from(table("investour.tbl_stocks"))
                .where(field("id")
                        .in(this.dsl.select(field("stock_id"))
                                .from("investour.tbl_stock_preferences")
                                .where(field("user_email").eq(userEmail))))
                .fetchInto(String.class);
    }

    public String getStockById(long stockId){
        return dsl.selectFrom(table("investour.tbl_stocks"))
                .where(field("id").eq(stockId))
                .fetchOne(field("name"), String.class);
    }
}
