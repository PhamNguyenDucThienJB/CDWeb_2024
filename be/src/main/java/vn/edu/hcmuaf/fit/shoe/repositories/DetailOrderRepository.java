package vn.edu.hcmuaf.fit.shoe.repositories;

import vn.edu.hcmuaf.fit.shoe.entity.DetailOrder;
import vn.edu.hcmuaf.fit.shoe.entity.DetailOrderId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailOrderRepository extends JpaRepository<DetailOrder, DetailOrderId> {
}
