package InvesTour.dal;

import InvesTour.Models.User;
import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final DSLContext dsl;

    public List<User> getAllUsers() {
        return this.dsl.select()
                .from(table("investour.tbl_users"))
                .fetchInto(User.class);
    }

    public void addUser(User user) {
        this.dsl.insertInto(table("investour.tbl_users"))
                .set(field("first_name"), user.getFirstName())
                .set(field("last_name"), user.getLastName())
                .set(field("email"), user.getEmail())
                .set(field("password"), user.getPassword())
                .set(field("role"), user.getRole())
                .execute();
    }

    public void addStockToUser(String userEmail, long stockId){
        this.dsl.insertInto(table("investour.tbl_stocks"))
                .set(field("user_email"), userEmail)
                .set(field("stock_id"), stockId)
                .execute();
    }

    public void deleteStockFromUser(String userEmail, long stockId){
        this.dsl.delete(table("investour.tbl_stocks_preferences"))
                .where(field("user_email").eq(field("userEmail")))
                .and(field("stock_id").eq(field("stockId")))
                .execute();
    }

    public boolean isStockExistForUser(String userEmail, long stockId){
        String a = dsl.selectFrom(table("investour.tbl_stocks_preferences"))
                .where(field("user_email").eq(userEmail))
                .and(field("stock_id").eq(stockId))
                .fetchOne(field("user_email"), String.class);
        return a != null;
    }

    public String getUserById(String userEmail){
        return dsl.selectFrom(table("investour.tbl_users"))
                .where(field("id").eq(userEmail))
                .fetchOne(field("name"), String.class);
    }
}
