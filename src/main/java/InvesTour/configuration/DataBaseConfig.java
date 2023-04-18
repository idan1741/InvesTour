package InvesTour.configuration;

import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.jooq.SQLDialect;
import org.jooq.impl.DataSourceConnectionProvider;
import org.jooq.impl.DefaultConfiguration;
import org.jooq.impl.DefaultDSLContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class DataBaseConfig {
    private final DataSource dataSource;

    @Bean
    public DataSourceConnectionProvider connectionProvider() {
        return new DataSourceConnectionProvider(this.dataSource);
    }

    private DefaultConfiguration configuration() {
        DefaultConfiguration configuration = new DefaultConfiguration();
        configuration.set(connectionProvider());
        configuration.set(SQLDialect.POSTGRES);

        return configuration;
    }

    @Bean
    public DSLContext dsl() {
        return new DefaultDSLContext(configuration());
    }
}
