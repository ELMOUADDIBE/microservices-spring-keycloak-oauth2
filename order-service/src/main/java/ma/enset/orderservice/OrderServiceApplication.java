package ma.enset.orderservice;

import ma.enset.orderservice.entities.Order;
import ma.enset.orderservice.entities.ProductItem;
import ma.enset.orderservice.entities.enums.OrderState;
import ma.enset.orderservice.model.Product;
import ma.enset.orderservice.repositories.OrderRepository;
import ma.enset.orderservice.repositories.ProductItemRepository;
import ma.enset.orderservice.restClients.InventoryRestClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(
            InventoryRestClient inventoryRestClient,
            OrderRepository orderRepository,
            ProductItemRepository productItemRepository
    ) {
        return args -> {
            List<String> allProducts = List.of("ComputerID", "PrinterID", "SmartphoneID", "TabletID");

            for (int i = 0; i < 10; i++) {
                Order savedOrder = orderRepository.save(
                        Order.builder()
                                .date(LocalDate.now())
                                .state(Math.random() > 0.5 ? OrderState.CONFIRMED : OrderState.CANCELLED)
                                .build()
                );

                allProducts.forEach(product -> {
                    productItemRepository.save(
                            ProductItem.builder()
                                    .productId(product)
                                    .price(Math.random() * 500)
                                    .quantity((int) (1 + Math.random() * 100))
                                    .order(savedOrder)
                                    .build()
                    );
                });
            }
        };
    }
}
