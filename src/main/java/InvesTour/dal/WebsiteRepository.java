package InvesTour.dal;


import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;

@Repository
@RequiredArgsConstructor
public class WebsiteRepository {
    private final DSLContext context;

    public void addWebsiteToUser(String userEmail, String websiteId) {
        this.context.insertInto(table("investour.tbl_website_preferences"))
                .set(field("user_email"), userEmail)
                .set(field("website_id"), websiteId)
                .execute();
    }

    public void deleteWebsiteFromUser(String userEmail, String websiteId) {
        this.context.delete(table("investour.tbl_website_preferences"))
                .where(field("user_email").eq(userEmail))
                .and(field("website_id").eq(websiteId))
                .execute();
    }

    public List<String> getAllWebsitesByUserEmail(String userEmail) {
        return this.context.select(field("website_id"))
                .from(table("investour.tbl_website_preferences"))
                .where(field("user_email").eq(userEmail))
                .fetchInto(String.class);
    }
}
