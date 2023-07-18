import React, { useState, useRef, createRef } from "react";
import { View, Text, Image, Animated, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";

const ZoomableImage = ({ imageSource }) => {
  const [panEnabled, setPanEnabled] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({ nativeEvent }) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (
      [State.CANCELLED, State.END, State.FAILED].includes(nativeEvent.state)
    ) {
      if (nScale < 1) {
        onPanEnd();
      }
    }
  };

  const onPanEnd = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    setPanEnabled(false);
  };

  return (
    <GestureHandlerRootView style={{ width: "100%" }}>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            // onEnded={onPanEnd}
            // onCancelled={onPanEnd}
            // onFailed={onPanEnd}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
          >
            <Animated.Image
              source={imageSource}
              style={{
                width: "100%",
                height: "100%",
                transform: [{ scale }, { translateX }, { translateY }],
              }}
              resizeMode="contain"
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ZoomableImage;
