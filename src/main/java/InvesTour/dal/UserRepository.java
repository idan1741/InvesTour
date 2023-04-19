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

    public void addStockToUser(String userEmail, String stockId){
        this.dsl.insertInto(table("investour.tbl_stocks"))
                .set(field("first_name"), userEmail)
                .set(field("last_name"), stockId)
                .execute();
    }

    public String getUserById(String userEmail){
        return dsl.selectFrom(table("investour.tbl_users"))
                .where(field("id").eq(userEmail))
                .fetchOne(field("name"), String.class);
    }
}
