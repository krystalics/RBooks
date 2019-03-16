package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.FollowDao;
import com.example.rbooks.backend.entity.Follow;
import com.example.rbooks.backend.entity.FollowRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FollowDaoImpl implements FollowDao {

  private final FollowRepository followRepository;

  @Autowired
  public FollowDaoImpl(FollowRepository followRepository) {
    this.followRepository = followRepository;
  }

  @Override
  public void setFollowAuthorId(int userId, int authorId) {
    Follow follow = new Follow();
    follow.setFollowauthorid(authorId);
    // 没有设置，它们是默认值
//    follow.setFollowbookid(0);
    follow.setUserid(userId); //这个需要从Session中获取

    followRepository.save(follow);
  }

  @Override
  public void setFollowBookId(int userId, int bookId) {
    Follow follow = new Follow();
    follow.setFollowbookid(bookId);
    follow.setUserid(userId); //这个需要从Session中获取

    followRepository.save(follow);

  }

  @Override
  public void deleteFollowAuthorId(int userId, int authorId) {
    followRepository.deleteByUseridAndAndFollowbookid(userId, authorId);
  }

  @Override
  public void deleteFollowBookId(int userId, int bookId) {
    followRepository.deleteByUseridAndAndFollowbookid(userId,bookId);
  }

  @Override
  public List<Follow> getFollows(int userId) {
    List<Follow> followList = new ArrayList<>();
    Iterable<Follow> follows = followRepository.findAll(); //一次加载整张表中的内容，会影响响应速度，后期要优化
    for (Follow follow : follows) {
      if (follow.getUserid() == userId) {
        followList.add(follow);
      }
    }
    return followList;
  }
}
