import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Image,
  Platform,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAuth } from '../contexts/AuthContext';
import type { AppBskyFeedDefs } from '@atproto/api';

type FeedViewPost = AppBskyFeedDefs.FeedViewPost;

export default function TimelineScreen() {
  const { agent, logout } = useAuth();
  const [posts, setPosts] = useState<FeedViewPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>();

  const loadTimeline = async (refresh = false) => {
    try {
      const response = await agent.getTimeline({
        limit: 50,
        cursor: refresh ? undefined : cursor,
      });

      if (refresh) {
        setPosts(response.data.feed);
      } else {
        setPosts((prev) => [...prev, ...response.data.feed]);
      }

      setCursor(response.data.cursor);
    } catch (error) {
      console.error('Error loading timeline:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadTimeline(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadTimeline(true);
  };

  const handleLoadMore = () => {
    if (!isLoading && cursor) {
      loadTimeline(false);
    }
  };

  const renderPost = ({ item }: { item: FeedViewPost }) => {
    const post = item.post;
    const author = post.author;
    const record = post.record as any;
    const embed = post.embed as any;

    return (
      <View style={styles.postContainer} accessible={true} accessibilityLabel={`Post by ${author.displayName || author.handle}`}>
        <View style={styles.postHeader}>
          {author.avatar && (
            <Image
              source={{ uri: author.avatar }}
              style={styles.avatar}
              accessibilityLabel={`${author.displayName || author.handle}'s avatar`}
            />
          )}
          <View style={styles.authorInfo}>
            <Text style={styles.displayName} accessibilityRole="header">
              {author.displayName || author.handle}
            </Text>
            <Text style={styles.handle}>@{author.handle}</Text>
          </View>
        </View>

        <Text style={styles.postText}>
          {record.text}
        </Text>

        {embed?.images && embed.images.length > 0 && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: embed.images[0].thumb }}
              style={styles.postImage}
              accessibilityLabel={embed.images[0].alt || 'Post image'}
            />
          </View>
        )}

        <View style={styles.postFooter}>
          <Text style={styles.postStats} accessibilityLabel="Post statistics">
            {post.replyCount || 0} replies · {post.repostCount || 0} reposts · {post.likeCount || 0} likes
          </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!cursor || isLoading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#1185fe" />
      </View>
    );
  };

  if (isLoading && posts.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1185fe" />
        <Text style={styles.loadingText}>Loading your timeline...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} accessibilityRole="header">
          Timeline
        </Text>
        <TouchableOpacity
          onPress={logout}
          style={styles.logoutButton}
          accessibilityRole="button"
          accessibilityLabel="Log out"
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlashList
        data={posts}
        renderItem={renderPost}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#1185fe"
          />
        }
        keyExtractor={(item) => item.post.uri}
        accessibilityRole="list"
        accessibilityLabel="Timeline feed"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    paddingTop: Platform.OS === 'ios' ? 60 : 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1185fe',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  logoutText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  displayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#14171a',
  },
  handle: {
    fontSize: 14,
    color: '#657786',
    marginTop: 2,
  },
  postText: {
    fontSize: 15,
    color: '#14171a',
    lineHeight: 20,
    marginBottom: 8,
  },
  imageContainer: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  postFooter: {
    marginTop: 8,
  },
  postStats: {
    fontSize: 13,
    color: '#657786',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
