import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, Dimensions, PixelRatio } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
    image: React.ReactNode;
    loading: boolean;
};

const { width, height } = Dimensions.get('window');

/**
 * Responsive scaling (better than raw Dimensions scaling)
 * - Prevents oversized UI on tablets
 * - Keeps consistency across densities
 */
const guidelineBaseWidth = 375;

const scale = (size: number) => {
    const newSize = (width / guidelineBaseWidth) * size;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Keep story size stable across devices
const SIZE = scale(66);
const STROKE = scale(3);

const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedStoryRing = ({ image, loading }: Props) => {
    const rotate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let animation: Animated.CompositeAnimation | undefined;

        if (loading) {
            rotate.setValue(0);

            animation = Animated.loop(
                Animated.timing(rotate, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            );

            animation.start();
        }

        return () => {
            animation?.stop();
        };
    }, [loading, rotate]);

    const spin = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View
            style={{
                width: SIZE,
                height: SIZE,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Animated.View
                style={{
                    position: 'absolute',
                    transform: [{ rotate: spin }],
                }}
            >
                <Svg width={SIZE} height={SIZE}>
                    <AnimatedCircle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        stroke="#004E89"
                        strokeWidth={STROKE}
                        strokeDasharray={`${CIRCUMFERENCE * 0.99} ${CIRCUMFERENCE}`}
                        strokeLinecap="butt"
                        fill="none"
                    />
                </Svg>
            </Animated.View>

            {image}
        </View>
    );
};

export default AnimatedStoryRing;