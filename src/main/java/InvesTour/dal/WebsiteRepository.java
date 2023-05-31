package InvesTour.dal;


import InvesTour.Models.Website;
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

    public void addWebsiteToUser(String userEmail, String websiteId, String websiteName) {
        this.context.insertInto(table("investour.tbl_website_preferences"))
                .set(field("user_email"), userEmail)
                .set(field("website_id"), websiteId)
                .set(field("website_name"), websiteName)
                .execute();
    }

    public void deleteWebsiteFromUser(String userEmail, String websiteId, String websiteName) {
        this.context.delete(table("investour.tbl_website_preferences"))
                .where(field("user_email").eq(userEmail))
                .and(field("website_id").eq(websiteId))
                .and(field("website_name").eq(websiteName))
                .execute();
    }

    public List<Website> getAllWebsitesByUserEmail(String userEmail) {
        return this.context.select(field("website_id"), field("website_name"))
                .from(table("investour.tbl_website_preferences"))
                .where(field("user_email").eq(userEmail))
                .fetchInto(Website.class);
    }
}
